#!/usr/bin/env python3

from tableauscraper import TableauScraper as TS
import pandas as pd

"""
Active Cases
Active Cases-Title
Closed Cases
Closed Cases -Title
Daily Results -Prelim
Hospitilizations
Hospitilizations (2)
Iso & Quarantine-Beds-Donut
Positivity Rate
Positivity Rate-7 Day
Positivity Rate-Jan1
Positivity Rate-May9
Positivity Rate_Spring
Severity
Total Population
Total Positive -7 Day- Count Breakout
Total Positive -7 Day-Title
Total Positive -Title
Total Positive -Title Jan1
Total Positive -Title May9
Total Positive -Title_Spring
Total Positive- Count Breakout
Total Positive- Count Breakout-Jan1
Total Positive- Count Breakout-May9
Total Positive- Count Breakout_Spring
Total Tests
Total Tests-7 Day
Total Tests-Jan1
Total Tests-May9
Total Tests_Spring
Updated Date
"""


def get_data(url):
    ts = TS()
    ts.loads(url)
    return ts.getWorkbook()


def clean_data(df):
    df = df.drop(['30 Day Range -value', '30 Day Range -alias', 'Measure Names-alias',
                  'ATTR(Positivity Moving Average Label)-alias', 'Measure Values-alias', 'AGG(% Positive)-value',
                  'AGG(% Positive)-alias', 'MDY(Test/Result Date)-alias'], axis=1)
    df = df.rename(columns={'MDY(Test/Result Date)-value': 'date', 'ATTR(# Positive)-alias': 'tests_positive',
                            'ATTR(# Tests)-alias': 'tests'})
    df = df.drop_duplicates()
    df = df[::-1]
    df['tests'] = df['tests'].replace({'%missing%': None})
    df['tests_positive'] = df['tests_positive'].replace({'%missing%': None})
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    df['date'] = df['date'].dt.strftime('%Y-%m-%d')
    return df


def analyze_data(df):
    df['tests_negative'] = df['tests'] - df['tests_positive']
    df['positivity'] = df['tests_positive'] / df['tests'] * 100
    df['positivity'] = df['positivity'].round(2)
    # set any days' positivity values to null if there were less than 10 tests
    df.loc[df['tests'] < 10, ['positivity']] = None
    df['positivity_rolling_7'] = (df['tests_positive'].rolling(7, min_periods=1).mean()/df['tests'].rolling(7, min_periods=1).mean() * 100).round(2)
    df['positivity_rolling_14'] = (df['tests_positive'].rolling(14, min_periods=1).mean()/df['tests'].rolling(14, min_periods=1).mean() * 100).round(2)
    return df


def main():
    wb = get_data("https://tableau.itap.purdue.edu/t/public/views/COVIDPublicDashboard/Testing")
    wb = wb.setParameter("Date Range", "All Time")
    ws = wb.getWorksheet("Daily Results -Prelim")
    df = pd.DataFrame(data=ws.data)
    df = clean_data(df)
    df = analyze_data(df)
    with open('data.json', 'w') as outfile:
        outfile.write(df.to_json(orient='records'))
        outfile.close()
    df.to_csv('data.csv', index=False)


if __name__ == "__main__":
    main()

# pip install quandl
# pip install pandas
# pip install sklearn

import pandas as pandas
import quandl

# NSE/IBULISL

df = quandl.get('WIKI/GOOGL')
print(df)

df = df[['Adj. High', 'Adj. Low', 'Adj. Close'  ,'Adj. Volume']]

df['HL_PCT'] = (df['Adj. High'] - df['Adj. Close']) / df['Adj. Close'] * 100.0

df['PCT_Change'] = (df['Adj. Close'] - df['Adj. Open']) / df['Adj. Open'] * 100.0

# df['HL_PCT'] = (df['Adj. High'] - df['Adj. Close']) / df['Adj. Close'] * 100.0

# df['HL_PCT'] = (df['Adj. High'] - df['Adj. Close']) / df['Adj. Close'] * 100.0


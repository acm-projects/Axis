import pandas as pd

# Load the combined CSV file
df = pd.read_csv('./combined_scholarships.csv')

# 1. Total count of scholarships
total_scholarships = df.shape[0]
print("Total number of scholarships:", total_scholarships)

# 2. Column names and data types
print("\nColumns in the dataset:")
print(df.columns.tolist())
print("\nData types of each column:")
print(df.dtypes)

# 3. Check for missing values in each column
print("\nMissing values per column:")
print(df.isnull().sum())

# 4. Check for duplicate rows
num_duplicates = df.duplicated().sum()
print("\nNumber of duplicate rows:", num_duplicates)

# 5. Validate date fields (open_date and close_date)
df['open_date'] = pd.to_datetime(df['open_date'], errors='coerce')
df['close_date'] = pd.to_datetime(df['close_date'], errors='coerce')
open_date_issues = df['open_date'].isnull().sum()
close_date_issues = df['close_date'].isnull().sum()
print("\nNumber of rows with invalid open_date:", open_date_issues)
print("Number of rows with invalid close_date:", close_date_issues)

# 6. Look at a sample of the award_amount field (it might have currency symbols)
print("\nSample unique values in 'award_amount':")
print(df['award_amount'].dropna().unique()[:10])

# 7. Check boolean-like fields for consistency
print("\nUnique values in 'essay_req':", df['essay_req'].unique())
print("Unique values in 'need-based':", df['need-based'].unique())
print("Unique values in 'merit-based':", df['merit-based'].unique())

import pandas as pd

# Step 1: Load your CSV data into a pandas DataFrame.
# Replace 'your_data.csv' with your actual CSV filename or use pd.read_csv with a file path.
df = pd.read_csv('ss_Z-C.csv')

# Step 2: Decide on which columns to group by.
# In your example, the rows for the same scholarship are identical in every column except 'requirements'.
# Here, we choose to group by 'name', 'org', 'open_date', and 'close_date'. 
# (You can adjust this list based on what uniquely identifies a scholarship in your data.)
grouping_columns = ['name', 'org', 'open_date', 'close_date']

# Step 3: Define a function to join the 'requirements' column values.
def join_requirements(req_series):
    # Drop missing values, get unique values, and join them with a newline separator.
    return "\n".join(req_series.dropna().unique())

# Step 4: Use groupby and aggregate the DataFrame.
# For columns that should be the same for each scholarship, we take the first value.
# For the 'requirements' column, we use our custom function.
aggregated_df = df.groupby(grouping_columns, as_index=False, sort=False).agg({
    'web-scraper-order': 'first',
    'web-scraper-start-url': 'first',
    'ss_link_selector': 'first',
    'ss_link_selector-href': 'first',
    'desc': 'first',
    'award_amount': 'first',
    'essay_req': 'first',
    'need-based': 'first',
    'merit-based': 'first',
    'website': 'first',
    'website-href': 'first',
    'requirements': join_requirements,
    'pursued_degree_level': 'first',
    'current_grade': 'first',
    'location': 'first',
    'min_gpa': 'first',
    'activities': 'first'
})

# Step 5: View the resulting DataFrame.
print(aggregated_df)

aggregated_df = aggregated_df.drop(columns=['pursued_degree_level', 'current_grade', 'min_gpa', 'activities'])

# Optional: Save the new DataFrame to a CSV file.
aggregated_df.to_csv('aggregated_scholarships_Z-C.csv', index=False)

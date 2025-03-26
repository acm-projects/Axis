import pandas as pd


# List the names (or paths) of your CSV files
files = [
    'aggregated_scholarships_#.csv',  # File for the # group
    'aggregated_scholarships_A.csv',     # File for the A group
    'aggregated_scholarships_B.csv',     # File for the B group
    'aggregated_scholarships_C.csv',     # File for the C group
    'aggregated_scholarships_Z-C.csv'     # File for the Z-C group
]


# This list will hold the DataFrames from each file
dfs = []

# Loop through the files, read them, and rename columns if necessary.
for file in files:
    df = pd.read_csv(file)
    
    # Check and rename columns so that they all use a common name for the link columns.
    # For example, if the file has columns 'sec' and 'sec-href', rename them:
    if 'sec' in df.columns:
        df = df.rename(columns={'sec': 'scholarship_link', 'sec-href': 'scholarship_link-href'})
    
    # Similarly, if the file uses 'ss_link_selector' columns, rename them:
    if 'ss_link_selector' in df.columns:
        df = df.rename(columns={'ss_link_selector': 'scholarship_link', 
                                  'ss_link_selector-href': 'scholarship_link-href'})
    
    # Optionally, print the columns of this file for manual verification:
    print(f"File '{file}' columns:")
    print(df.columns.tolist())
    
    dfs.append(df)


# (Optional) Validate that all DataFrames now have the same column structure.
common_cols = dfs[0].columns.tolist()
for i, df in enumerate(dfs[1:], start=2):
    if df.columns.tolist() != common_cols:
        print(f"Warning: File {i} does not have the same columns as the first file.")
    else:
        print(f"File {i} matches the columns.")


# Combine all DataFrames
combined_df = pd.concat(dfs, ignore_index=True)

# Remove duplicate rows
combined_df = combined_df.drop_duplicates()

# Save the combined DataFrame to a new CSV file.
combined_df.to_csv('combined_scholarships.csv', index=False)
print("All files have been combined into 'combined_scholarships.csv'.")
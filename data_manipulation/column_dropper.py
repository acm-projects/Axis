import pandas as pd
aggregated_df = pd.read_csv('aggregated_scholarships_A.csv')

aggregated_df = aggregated_df.drop(columns=['pursued_degree_level', 'current_grade', 'min_gpa', 'activities'])

aggregated_df.to_csv('aggregated_scholarships_A.csv', index=False)

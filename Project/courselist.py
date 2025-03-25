#import pandas as pd
import requests
import re
import mysql.connector
import json

def parse_prereqs(prereq_string):
    """Parses prerequisite string into a structured 2D list format preserving OR/AND logic."""
    if not prereq_string:
        return json.dumps([])  # Empty JSON array if no prerequisites exist

    # Regular expression to extract course numbers
    course_pattern = r'\d{2}:\d{3}:\d{3}'

    # Split AND groups using ') and ('
    and_groups = re.split(r'\)\s*and\s*\(', prereq_string.strip("()"))

    prereq_list = []
    for group in and_groups:
        # Extract OR courses from each AND group
        or_courses = re.findall(course_pattern, group)
        if or_courses:
            prereq_list.append(or_courses)  # Add OR group as a list

    return json.dumps(prereq_list)  # Convert to JSON format for MySQL

# Define MySQL connection
db = mysql.connector.connect(
    host= "bmu76n1mf2sehxodofjl-mysql.services.clever-cloud.com",
    user= "udaban8ouzufgby5",
    password= "xH67BYKcnsZq9J0vUVvO", 
    database= "bmu76n1mf2sehxodofjl"
)
cursor = db.cursor()

# Define the School of Engineering subjects
subjects = ["125", "155", "180", "332", "440", "650", "635"]  # Add more if needed
base_url = "http://sis.rutgers.edu/oldsoc/courses.json?semester=12025&campus=NB&level=UG&subject="

# Fetch and insert data
for subject in subjects:
    response = requests.get(base_url + subject)
    
    if response.status_code == 200:
        courses = response.json()
        print("length of courses: ",len(courses))
        
        for course in courses:
            print("-----------------------------------------------------------------------\n")
            print(course)
            coursenum = f"14:{course['subject']}:{course['courseNumber']}"
            courseName = course.get('title', 'N/A')
            campus = course.get('campusCode', 'NB')
            opensections = course.get('openSections', '0')
            
            # Extract prerequisites
            prereqs = parse_prereqs(course.get("preReqNotes"))

            # Extract credits (can be a range)
            credits = course.get('credits', '0')

            # Insert into MySQL
            query = """
                INSERT INTO engineering_courses (coursenum, courseName, campus, opensections, prereqs, credits)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE courseName=%s, campus=%s, opensections=%s, prereqs=%s, credits=%s;
            """
            cursor.execute(query, (coursenum, courseName, campus, opensections, prereqs, credits, 
                                   courseName, campus, opensections, prereqs, credits))

# Commit and close
db.commit()
cursor.close()
db.close()

print("Data inserted into MySQL successfully.")

"""
all_courses = []
for subject in subjects:
    response = requests.get(base_url + subject)
    if response.status_code == 200:
        all_courses.extend("14"+response.json())

df = pd.DataFrame(all_courses)
df.to_csv("rutgers_engineering_courses.csv", index=False)
"""
# import json
# from openpyxl import load_workbook

# EXCEL_PATH = r'D:\TestResults\SauceDemo_TestCases.xlsx'
# RESULTS_PATH = r'D:\TestResults\results.json'

# wb = load_workbook(EXCEL_PATH)
# ws = wb['Authentication']

# with open(RESULTS_PATH, 'r', encoding='utf-8') as f:
#     results = json.load(f)

# for row in ws.iter_rows(min_row=4):
#     tc_id = row[0].value
#     if tc_id in results:
#         row[5].value = results[tc_id]  # column F = Status

# wb.save(EXCEL_PATH)
# print(f"Updated: {EXCEL_PATH}")



import re
import json
from openpyxl import load_workbook

EXCEL_PATH = r'D:\TestResults\SauceDemo_TestCases.xlsx'
RESULTS_PATH = r'D:\TestResults\results.json'

def clean_text(text):
    text = text.replace('\n', ' | ')
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)
    return text

wb = load_workbook(EXCEL_PATH)
sheet_name = next(s for s in wb.sheetnames if 'Authentication' in s)
ws = wb[sheet_name]

with open(RESULTS_PATH, 'r', encoding='utf-8') as f:
    results = json.load(f)

for row in ws.iter_rows(min_row=4):
    tc_id = row[0].value
    if tc_id in results:
        data = json.loads(results[tc_id])
        row[5].value = data['status']
        row[7].value = clean_text(data['note'])

wb.save(EXCEL_PATH)
print(f"Updated: {EXCEL_PATH}")
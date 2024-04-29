import os
import random
import json
from typing import Optional, Literal
import inquirer
import pyperclip

JSON_PATH = os.path.join(os.getcwd(), "record.json")

class OARecord:
    def __init__(self):
        pass
    
    def read_json(self, feature: str, unit: int, attitude: str, is_complete: bool) -> str:
        
        with open(JSON_PATH, "r", encoding="utf-8") as jfile:
            jdata = json.loads(jfile.read())

        res = jdata[feature][unit-1] + random.choice(jdata["Student"][attitude])
        
        if not is_complete: res += random.choice(jdata["Student"]["Uncomplete"])
        
        return res + jdata["EX"]
        
    
    def run(self):
        student_name = input("[?] Student name: ")
        questions = [
            inquirer.List("level", message="Level: ", choices=["Basic", "Elite", "Mix"]),
            inquirer.List("unit", message="Unit: ", choices=[i for i in range(1, 16)]),
            inquirer.List("attitude", message="Attitude: ", choices=["Good", "Bad"]),
            inquirer.List("complete", message="Is completed? ", choices=[True, False])
        ]
        
        answers = inquirer.prompt(questions)
        level = answers.get("level")
        unit = answers.get("unit")
        attitude = answers.get("attitude")
        is_complete = answers.get("complete")
        res = self.read_json(level, unit, attitude, is_complete).replace("XXX", student_name)
        
        pyperclip.copy(res)
        print(res)

def process():
    with open("./a.txt", "r", encoding="utf-8") as f:
        txt = f.read()
        txt = txt.split("\n")
        for i in range(len(txt)):
            if not txt[i].startswith("###") and not txt[i].startswith("\n") and not txt[i] == '':
                t = txt[i].strip()
                print(f'\"{t}\"', end = ",\n")
    
if __name__ == "__main__":
    while True:
        oa = OARecord()
        oa.run()
        os.system("pause")
        os.system("cls")
    
    
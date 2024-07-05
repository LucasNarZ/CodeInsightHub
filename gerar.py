#!/usr/bin/python3

import random
import json
import string

def get_termo_busca():
    return ''.join(random.choice(string.ascii_letters + ' ') for i in range(random.randint(1, 50))).strip() or 'x'

def gera_termos_busca(numero_registros):
    with open("./termos-busca.json", "w") as f:
        f.write("[\n")
        for _ in range(numero_registros):
            f.write(f'{{ "t": "{get_termo_busca()}" }},\n')
        f.write("]\n")

gera_termos_busca(5_000)

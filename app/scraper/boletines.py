# import json
from re import findall

import xmltodict
from dateutil.parser import isoparse

from app.core.settings import settings
from app.schemas.boletin import Boletin


def convert_xml_to_json(xml_file_path: str):
    """Parses and converts an XML file to a JSON file

    Args:
        xml_file_path (str): Path of the XML file to convert
    """
    with open(xml_file_path) as xml_file:
        # Read xml_file to dict object
        data_dict = xmltodict.parse(xml_file.read())
        return data_dict

        # Generate JSON object
        # json_data = json.dumps(data_dict)

        # Write the JSON data to .json file
        # with open(xml_file_path.replace(".xml", ".json"), "w") as json_file:
        #    json_file.write(json_data)


# TODO Refactor to Boletin class
def extract_boletin_number(name: str) -> int:
    """Extract the boletin number from name string

    Args:
        name (str): The name of the boletin

    Returns:
        int: The boletin number
    """
    numbers = [int(n) for n in findall(r"\d+", name)]

    if numbers.count(19) > 1:
        return 19
    elif "semana" in name.lower():
        return [n for n in numbers if n < 54][0]
    return [n for n in numbers if n != 19][0]


def create_boletin(data: dict) -> Boletin:
    """Creates Boletin object from data dict

    Args:
        data (dict): Data dict

    Returns:
        Boletin: Boletin object
    """
    if "covid" in data["Category"].lower():
        category = "covid"
    elif "semanal" or "alerta" in data["Category"].lower():
        category = "semanal"

    boletin = Boletin(
        category=category,
        date=isoparse(data["Date"]),
        number=extract_boletin_number(data["Name"]),
        url=f"{settings.DIGEPI_URL}{data['Url']}",
    )
    return boletin


def parse_boletines(data) -> list[Boletin]:
    """Parses boletines from data dict

    Args:
        data (dict): Boletines data

    Returns:
        list[Boletin]: List of Boletin objects
    """
    boletines: list[Boletin] = []
    for boletin in data["ArrayOfFileItem"]["FileItem"]:
        try:
            if (
                "semana" in boletin["Category"].lower()
                or "covid" in boletin["Category"].lower()
            ):
                boletines.append(create_boletin(boletin))
        except IndexError:
            print(f"BOLETIN: {boletin}")
            break
    return boletines


def download_boletines(boletines: list[Boletin]):
    size = len(boletines)
    for index, boletin in enumerate(boletines):
        boletin.download()
        prct = round(index / size * 100, 2)
        print(f"{prct:.2f} % - Boletín {boletin.category} {boletin.number} descargado")

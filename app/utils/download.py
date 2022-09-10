import requests
from pydantic import HttpUrl


def download_file(url: HttpUrl, path: str):
    """Downloads a file from specified URL

    Args:
        url (HttpUrl): URL from which to download the file
        path (str): Path to which to save the file
    """
    response = requests.get(url)

    with open(path, "wb") as file:
        file.write(response.content)

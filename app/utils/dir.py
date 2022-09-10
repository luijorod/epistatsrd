from os import makedirs, mkdir


def create_dir(path: str):
    mkdir(path)


def create_dirs(path: str):
    makedirs(path)

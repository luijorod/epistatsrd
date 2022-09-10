import os
from datetime import datetime

from pydantic import BaseModel, HttpUrl

from app.core.settings import settings
from app.utils.dir import create_dirs
from app.utils.download import download_file


class Boletin(BaseModel):
    category: str
    date: datetime
    date_published: datetime
    number: int
    url: HttpUrl

    def download(self, path: str = settings.BOLETINES_DIR):
        """Downloads boletin associated with object

        Args:
            path (str, optional): Path to which to save the document. Defaults to
            settings.BOLETINES_DIR.
        """
        file_name = f"{path}boletin-{self.category}-{self.number}-{self.date.year}.pdf"

        if not os.path.isdir(path):
            create_dirs(path)
        download_file(self.url, file_name)

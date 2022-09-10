import pytest

from app.scraper.boletines import extract_boletin_number


@pytest.mark.parametrize(
    "boletin",
    [
        "Boletin Semanal 31-2022",
        "B Semanal 51-2016",
        "B S 23-2015",
        "Boletin semanal 01-08",
    ],
)
def test_extract_boletin_semanal_number(boletin):
    """
    GIVEN a boletin semanal name
    WHEN it is passed to extract_boletin_number
    THEN it should return the boletin number
    """
    number = extract_boletin_number(boletin)

    assert number in [31, 51, 23, 1]


@pytest.mark.parametrize(
    "boletin",
    [
        "Boletin COVID - 19 no. 900",
        "Boletín especial 742 COVID-19",
        "Boletin especial 01 - COVID-19.",
        "Boletin Especial 211 COVID 19",
        "Boletin Especial 19 COVID 19",
    ],
)
def test_extract_boletin_covid_number(boletin):
    """
    GIVEN a boletin covid name
    WHEN it is passed to extract_boletin_number
    THEN it should return the boletin number
    """
    number = extract_boletin_number(boletin)

    assert number in [900, 742, 1, 211, 19]

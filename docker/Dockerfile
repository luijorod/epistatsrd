FROM python:3.10.7-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=True \
    PYTHONUNBUFFERED=True \
    # Pip
    PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=True \
    PIP_NO_CACHE_DIR=True \
    # Poetry
    POETRY_NO_INTERACTION=True \
    POETRY_VERSION=1.2.0 \
    POETRY_VIRTUALENVS_IN_PROJECT=True \
    # Paths
    POETRY_HOME="/poetry" \
    VENV_PATH="/app/.venv"

# Set working directory
WORKDIR /app

# Update
RUN apt-get update && apt-get install --no-install-recommends -y curl
RUN curl -sSL https://install.python-poetry.org | python3 -

# Insert poetry and virtual environment paths into $PATH
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Install project dependencies
COPY poetry.lock pyproject.toml /app/
RUN poetry install --no-dev --no-ansi --no-root

# Copy project files
COPY . /app
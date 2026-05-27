EMISSION_FACTORS = {
    'diesel': 2.68,
    'electricity': 0.82,
    'flight': 0.15
}


def normalize_unit(unit):
    unit = unit.lower()

    mapping = {
        'l': 'liters',
        'liter': 'liters',
        'litre': 'liters',
        'gal': 'gallons',
        'kwh': 'kwh'
    }

    return mapping.get(unit, unit)


def calculate_emissions(activity, quantity):
    factor = EMISSION_FACTORS.get(activity.lower(), 1)

    return factor, quantity * factor
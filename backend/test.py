
def is_valid_message(msg: dict) -> bool:
    try:
        # print(msg)
        return all(
            [
                msg["type"] == "message",
                msg["date"],
                msg["from"],
                msg["text"],
                isinstance(msg["text"], str),
            ]
        )
    except KeyError:
        return False



print(
    is_valid_message(
        {
            "id": 38839,
            "type": "message",
            "date": "2022-04-30T18:31:25",
            "date_unixtime": "1651332685",
            "from": "Мама",
            "from_id": "user2110971679",
            "photo": "(File not included. Change data exporting settings to download.)",
            "photo_file_size": 408529,
            "width": 1280,
            "height": 1280,
            "text": "123",
            "text_entities": [],
        },
    )
)

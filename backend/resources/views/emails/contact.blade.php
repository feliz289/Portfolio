<!DOCTYPE html>
<html>
<head>
    <title>Contact Message</title>
</head>
<body>

    <h2>New Message From Portfolio</h2>

    <p>
        <strong>Name:</strong>
        {{ $data['name'] }}
    </p>

    <p>
        <strong>Email:</strong>
        {{ $data['email'] }}
    </p>

    <p>
        <strong>Message:</strong>
    </p>

    <p>
        {{ $data['message'] }}
    </p>

</body>
</html>
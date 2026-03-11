import pdfkit
from io import BytesIO


def generate_post_pdf(post_data):
    html_template = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    line-height: 1.6;
                }}
                h1 {{
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <h1>{post_data.title}</h1>
            {post_data.content}
        </body>
    </html>
    """

    pdf = pdfkit.from_string(html_template, False)

    buffer = BytesIO(pdf)
    buffer.seek(0)

    return buffer

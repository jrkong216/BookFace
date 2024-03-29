# in api/helpers.py
import boto3, botocore
import os
import uuid

BUCKET_NAME = os.environ.get("AWS_BUCKET_NAME")
S3_LOCATION=os.environ.get("AWS_DOMAIN")
ALLOWED_EXTENSIONS={"pdf", "png", "jpg", "jpeg", "gif", "mp4", "mkv"}

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

#check if the filename is in allowed format
def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext=filename.rsplit(".", 1)[1].lower()
    unique_filename=uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            # ExtraArgs={
            #     "ACL": acl,
            #     "ContentType": file.content_type
            # }
        )
    except Exception as e:
        # in case the our s3 upload fails
        print("error##################",e)
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def delete_file_from_s3(filename):

    try:
        s3.delete_object(Bucket=BUCKET_NAME, Key=filename)
    except Exception as e:
        return {"errors": str(e)}

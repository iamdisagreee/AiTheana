import boto3
from app.config import get_settings
from botocore.exceptions import ClientError


class S3SyncClient:
    def __init__(
        self,
        access_key: str,
        secret_key: str,
        endpoint_url: str,
        bucket_name: str,
    ):
        self.client = boto3.client(
            "s3",
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            endpoint_url=endpoint_url,
        )
        self.bucket_name = bucket_name

    def upload_file(
        self, file_path: str, object_name: str | None = None
    ) -> bool:
        """Синхронная загрузка файла с диска"""
        if object_name is None:
            object_name = file_path
        try:
            self.client.upload_file(
                file_path, self.bucket_name, object_name
            )
            print(
                f"Uploaded {file_path} to {self.bucket_name}/{object_name}"
            )
            return True
        except ClientError as e:
            print(f"S3 upload error: {e}")
            return False

    def upload_bytes(self, data: bytes, object_name: str) -> bool:
        """Загрузка из байтового буфера"""
        try:
            self.client.put_object(
                Bucket=self.bucket_name, Key=object_name, Body=data
            )
            return True
        except ClientError as e:
            print(f"S3 put_object error: {e}")
            return False

    def download_file(
        self, object_name: str, destination_path: str
    ) -> bool:
        try:
            self.client.download_file(
                self.bucket_name, object_name, destination_path
            )
            return True
        except ClientError as e:
            print(f"S3 download error: {e}")
            return False

    def delete_file(self, object_name: str) -> bool:
        try:
            self.client.delete_object(
                Bucket=self.bucket_name, Key=object_name
            )
            return True
        except ClientError as e:
            print(f"S3 delete error: {e}")
            return False

    def generate_presigned_url(
        self, object_name: str, expiration: int = 3600
    ) -> str | None:
        try:
            url = self.client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": object_name},
                ExpiresIn=expiration,
            )
            return url
        except ClientError as e:
            print(f"Presigned URL error: {e}")
            return None


settings = get_settings()
s3_sync_client = S3SyncClient(
    access_key=settings.s3_access_key,
    secret_key=settings.s3_secret_key,
    endpoint_url=settings.s3_endpoint_url,
    bucket_name=settings.s3_bucket_name,
)

# s3_sync_client.upload_file('./test.md', "raw/test-raw.txt")
# s3_sync_client.upload_file('./test.md', "processed/test-raw.txt")

from contextlib import asynccontextmanager

from aiobotocore.session import get_session
from app.config import get_settings
from botocore.exceptions import ClientError
from fastapi import UploadFile


class S3AsyncClient:
    def __init__(
        self,
        access_key: str,
        secret_key: str,
        endpoint_url: str,
        bucket_name: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url,
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client(
            "s3", **self.config
        ) as client:
            yield client

    async def upload_file(self, file: UploadFile, filename: str) -> bool:
        """Асинхронная загрузка из UploadFile (FastAPI)"""
        try:
            content = await file.read()
            return await self.upload_bytes(content, filename)
        except ClientError as e:
            print(f"S3 async upload error: {e}")
            return False
        finally:
            await file.close()

    async def upload_bytes(self, data: bytes, filename: str) -> bool:
        """Загрузка байтов"""
        try:
            async with self.get_client() as client:
                await client.put_object(
                    Bucket=self.bucket_name, Key=filename, Body=data
                )
            return True
        except ClientError as e:
            print(f"S3 put_object error: {e}")
            return False

    async def get_bytes(self, filename: str) -> bytes | None:
        """Скачать объект и вернуть байтами (без сохранения на диск)"""
        try:
            async with self.get_client() as client:
                response = await client.get_object(
                    Bucket=self.bucket_name, Key=filename
                )
                data = await response["Body"].read()
                return data
        except ClientError as e:
            print(f"S3 get_object error: {e}")
            return None

    async def delete_file(self, filename: str) -> bool:
        """Удалить объект"""
        try:
            async with self.get_client() as client:
                await client.delete_object(
                    Bucket=self.bucket_name, Key=filename
                )
            return True
        except ClientError as e:
            print(f"S3 delete error: {e}")
            return False

    async def generate_presigned_url(
        self, filename: str, expiration: int = 3600
    ) -> str | None:
        try:
            async with self.get_client() as client:
                url = await client.generate_presigned_url(
                    "get_object",
                    Params={"Bucket": self.bucket_name, "Key": filename},
                    ExpiresIn=expiration,
                )
                return url
        except ClientError as e:
            print(f"Presigned URL error: {e}")
            return None


settings = get_settings()
s3_async_client = S3AsyncClient(
    access_key=settings.s3_access_key,
    secret_key=settings.s3_secret_key,
    endpoint_url=settings.s3_endpoint_url,
    bucket_name=settings.s3_bucket_name,
)


# async def test_upload():

#     with open("./test.md", "rb") as f:
#         data = f.read()

#     await s3_async_client.upload_bytes(
#         data, "raw/test-async-raw.txt"
#     )
#     await s3_async_client.upload_bytes(
#         data, "processed/test-async-raw.txt"
#     )


# asyncio.run(test_upload())

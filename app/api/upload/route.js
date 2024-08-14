import { stat, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import mime from 'mime';
import dayjs from 'dayjs';
import { addNote } from '@/lib/redis';

export async function POST(request) {
  // 获取formdata
  const formData = await request.formData();
  const file = formData.get('file');
  // 空值判断
  if (!file) {
    return NextResponse.json({ erroe: 'file is required' }, { status: 400 });
  }
  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);
  // 创建上传文件文件夹
  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 500 }
      );
    }
  }
  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, '');
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString('utf-8'),
      })
    );

    // 清除缓存
    revalidatePath('/', 'layout');

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    });
  } catch (error) {
    console.error(e);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

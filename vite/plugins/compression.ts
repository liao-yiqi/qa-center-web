import { compression } from 'vite-plugin-compression2'
import type { Plugin } from 'vite'
export default function createCompression(env: Record<string, string>) {
  const { VITE_BUILD_COMPRESS } = env
  const plugin: Plugin[] = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
        plugin.push(
            compression({
                algorithms: ['gzip'],
                // 体积大于threshold则进行压缩，单位为bytes
                threshold: 1024 * 50,
                // 压缩后是否删除源文件
                deleteOriginalAssets: false,
            })
        )
    }
    if (compressList.includes('brotli')) {
        plugin.push(
            compression({
                // 压缩算法
                algorithms: ['brotliCompress'],
                // 体积大于threshold则进行压缩，单位为bytes
                threshold: 1024 * 50,
                // 压缩后是否删除源文件
                deleteOriginalAssets: false,
            })
        )
    }
  }
  return plugin
}

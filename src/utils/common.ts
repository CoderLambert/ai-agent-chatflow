import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { type NextRequest } from 'next/server'
const API_KEY = 'app-8LRYB7Gz1nyEQHW22p5u3nMv'
const APP_ID = 'a794acb6-ee01-4d11-8284-83994fb41fea'
const API_URL = 'http://10.21.77.20:30001/v1'


const client = new ChatClient(API_KEY, API_URL)

const userPrefix = `user_${APP_ID}:`

const getInfo = (request: NextRequest) => {
    const sessionId = request.cookies.get('session_id')?.value || v4()
    const user = userPrefix + sessionId
    return {
        sessionId,
        user,
    }
}

const setSession = (sessionId: string) => {
    return { 'Set-Cookie': `session_id=${sessionId}` }
}

export {
    client,
    getInfo,
    setSession
}

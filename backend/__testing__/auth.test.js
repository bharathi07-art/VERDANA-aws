import request from 'supertest';
import express from 'express';

const app = express();

describe("Test the Admin",()=>{
    test("Test the Admin authentication functionality",async ()=>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            username:"bharathi",
            password:"password",
        });

        expect(response.status).toBe(500)
    })
})

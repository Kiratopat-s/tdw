'use server';
import { google } from "googleapis";
import { signData } from "@/type/glsheet";

export async function getSheetData(param: signData) {
    const glAuth = await google.auth.getClient({
        projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
        credentials: {
            "type": "service_account",
            "project_id": "thtd-work-daily",
            "private_key_id": process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY_ID,
            "private_key": process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
            "client_email": process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            "client_id": process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            "universe_domain": "googleapis.com"
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const values = [
        [
            param.timestamp,
            param.email,
            param.status,
            param.accuracy,
            param.latitude,
            param.longitude,
            param.altitude,
            param.heading,
            param.speed,
            param.linkmap,
        ],
    ];
    const resource = {
        values,
    };
    try {
        const result = await glSheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'RAW_INPUT!A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: resource,
        });
        return resource;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
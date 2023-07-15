import { update, ref, remove, push } from "firebase/database";
import { database } from "../db";

export async function updateData(path, values) {
    await update(ref(database, path), values);
}

export async function removeData(path, values) {
    await remove(ref(database, path), values);
}

export async function pushData(path, values) {
    await push(ref(database, path), values);
}
// src/services/userService.js
import API from "./api";

/**
 * Servicio para consumir el recurso /usuarios en MockAPI
 * Funciones: getUsers, getUser, createUser, updateUser, deleteUser, authenticate
 */

export async function getUsers() {
  try {
    const res = await API.get("/usuarios");
    return res.data;
  } catch (err) {
    console.error("userService.getUsers error:", err);
    throw err;
  }
}

export async function getUser(id) {
  try {
    const res = await API.get(`/usuarios/${id}`);
    return res.data;
  } catch (err) {
    console.error("userService.getUser error:", err);
    throw err;
  }
}

export async function createUser(payload) {
  try {
    const res = await API.post("/usuarios", payload);
    return res.data;
  } catch (err) {
    console.error("userService.createUser error:", err);
    throw err;
  }
}

export async function updateUser(id, payload) {
  try {
    const res = await API.put(`/usuarios/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("userService.updateUser error:", err);
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    const res = await API.delete(`/usuarios/${id}`);
    return res.data;
  } catch (err) {
    console.error("userService.deleteUser error:", err);
    throw err;
  }
}

/**
 * authenticate(username, password)
 * - Consulta MockAPI /usuarios y busca coincidencia.
 * - Retorna el usuario si coincide, o null si no.
 * Nota: en un proyecto real se recibiría un token, aquí simulamos guardando 'logueado' en localStorage.
 */
export async function authenticate(username, password) {
  try {
    const res = await API.get("/usuarios", {
      params: {
        // Si quieres, MockAPI soporta filtrado por query, ej: ?username=foo
        username: username
      }
    });

    const users = res.data;

    // Si MockAPI retorna lista vacía porque no hay match por query, mejor revisar todos:
    // (esto es seguro y simple)
    const allUsers = users.length ? users : (await getUsers());

    const found = allUsers.find(
      (u) => (u.username === username || u.name === username) && u.password === password
    );

    return found || null;
  } catch (err) {
    console.error("userService.authenticate error:", err);
    throw err;
  }
}

import setHealthServiceRoutes from "./health.js";



const router = [
    setHealthServiceRoutes
]

export default function setRouting(app){
    router.forEach(router => router(app));
}

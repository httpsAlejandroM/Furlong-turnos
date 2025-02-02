const hourAndMinutes = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit"
      };
      const fecha = new Date().toLocaleString("es-Es", dateOptions)

      return fecha
}

export {
    hourAndMinutes
}
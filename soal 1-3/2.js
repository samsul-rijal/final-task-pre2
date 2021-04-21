function printUmur() {
    let nilai = document.getElementById("inputUmur").value;
    if (nilai >= 20 && nilai <= 60) {
        document.getElementById("output-umur").innerHTML = "Umur " + nilai + " tahun adalah Dewasa";
    } else if (nilai >= 11 && nilai <= 19) {
        document.getElementById("output-umur").innerHTML = "Umur " + nilai + " tahun adalah Remaja";
    } else if (nilai >= 2 && nilai <= 10) {
        document.getElementById("output-umur").innerHTML = "Umur " + nilai + " tahun adalah Anak-anak";
    } else if (nilai >= 0 && nilai <= 1) {
        document.getElementById("output-umur").innerHTML = "Umur " + nilai + " tahun adalah Bayi";
    } else {
        document.getElementById("output-umur").innerHTML = "Umur " + nilai + " tahun adalah Lanjut Usia";

    }
}

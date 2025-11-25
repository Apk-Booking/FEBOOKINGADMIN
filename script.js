// ===============================================
//  DATA DUMMY BOOKING
// ===============================================
let bookings = [
    { id: 1, nama: "Budi Santoso", divisi: "Pemasaran", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-25", waktu: "09:00-11:00", status: "Disetujui" },
    { id: 2, nama: "Siti Aminah", divisi: "SDM & Umum", ruangan: "Ruang Meeting Direksi", tanggal: "2025-11-25", waktu: "13:00-15:00", status: "Menunggu" },
    { id: 3, nama: "Andi Wijaya", divisi: "Teknologi Informasi", ruangan: "Lab Komputer", tanggal: "2025-11-26", waktu: "10:00-12:00", status: "Ditolak - Penuh" },
    { id: 4, nama: "Rina Kartika", divisi: "Keuangan", ruangan: "Aula Serbaguna", tanggal: "2025-11-26", waktu: "15:00-17:00", status: "Disetujui" },
    { id: 5, nama: "Dedi Corbuzier", divisi: "Humas", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-27", waktu: "08:00-10:00", status: "Menunggu" },
    { id: 6, nama: "Joko Anwar", divisi: "Kreatif", ruangan: "Aula Serbaguna", tanggal: "2025-11-28", waktu: "13:00-16:00", status: "Menunggu" }
];

// ===============================================
//  DATA DUMMY HISTORY
// ===============================================
let historyList = [
    {
        nama: "Budi Santoso",
        divisi: "Pemasaran",
        ruangan: "Ruang Rapat Utama Lt.1",
        tanggal: "2025-11-20",
        waktu: "09:00-11:00",
        status: "Disetujui",
        inputTime: "2025-11-19 14:22"
    },
    {
        nama: "Siti Aminah",
        divisi: "SDM & Umum",
        ruangan: "Ruang Meeting Direksi",
        tanggal: "2025-11-21",
        waktu: "13:00-15:00",
        status: "Menunggu",
        inputTime: "2025-11-20 10:51"
    },
    {
        nama: "Andi Wijaya",
        divisi: "Teknologi Informasi",
        ruangan: "Lab Komputer",
        tanggal: "2025-11-18",
        waktu: "10:00-12:00",
        status: "Ditolak - Penuh",
        inputTime: "2025-11-17 09:11"
    },
    {
        nama: "Rina Kartika",
        divisi: "Keuangan",
        ruangan: "Aula Serbaguna",
        tanggal: "2025-11-22",
        waktu: "15:00-17:00",
        status: "Disetujui",
        inputTime: "2025-11-21 16:30"
    }
];


// ===============================================
//  LOAD AWAL HALAMAN
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    updateCards();
    renderHistory();
});


// ===============================================
//  RENDER TABEL BOOKING
// ===============================================
function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = "";

    if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada data booking.</td></tr>`;
        return;
    }

    bookings.forEach(item => {
        let statusClass = "status-menunggu";
        if (item.status === "Disetujui") statusClass = "status-disetujui";
        else if (item.status.includes("Ditolak")) statusClass = "status-ditolak";

        const initial = item.nama.charAt(0).toUpperCase();

        const row = `
            <tr>
                <td class="ps-4">
                    <div class="d-flex align-items-center">
                        <div class="avatar-initial">${initial}</div>
                        <div>
                            <div class="fw-bold text-dark">${item.nama}</div>
                            <div class="text-muted" style="font-size: 0.75rem;">${item.divisi}</div>
                        </div>
                    </div>
                </td>
                <td><span class="fw-medium text-dark">${item.ruangan}</span></td>
                <td>
                    <div class="d-flex flex-column">
                        <span class="fw-bold text-secondary" style="font-size: 0.85rem;">${item.tanggal}</span>
                        <span class="badge bg-light text-dark border mt-1" style="font-weight:400; width: fit-content;">${item.waktu}</span>
                    </div>
                </td>
                <td>
                    <select class="form-select status-select ${statusClass}" 
                            onchange="updateStatus(${item.id}, this.value)">
                        <option value="Menunggu" ${item.status === 'Menunggu' ? 'selected' : ''}>⏳ Menunggu</option>
                        <option value="Disetujui" ${item.status === 'Disetujui' ? 'selected' : ''}>✅ Disetujui</option>
                        <option value="Ditolak - Penuh" ${item.status.includes("Ditolak") ? 'selected' : ''}>❌ Ditolak</option>
                    </select>
                </td>
                <td class="text-center">
                    <button class="btn btn-link text-danger p-0" onclick="hapusData(${item.id})" title="Hapus Data">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


// ===============================================
//  KARTU INFORMASI TOTAL BOOKING
// ===============================================
function updateCards() {
    const total = bookings.length;
    const disetujui = bookings.filter(b => b.status === "Disetujui").length;
    const menunggu = bookings.filter(b => b.status === "Menunggu").length;
    const ditolak = bookings.filter(b => b.status.includes("Ditolak")).length;

    document.getElementById('count-total').innerText = total;
    document.getElementById('count-disetujui').innerText = disetujui;
    document.getElementById('count-menunggu').innerText = menunggu;
    document.getElementById('count-ditolak').innerText = ditolak;
}


// ===============================================
//  SIMPAN BOOKING BARU
// ===============================================
function simpanData() {
    const nama = document.getElementById('inputNama').value;
    const divisi = document.getElementById('inputDivisi').value;
    const ruangan = document.getElementById('inputRuangan').value;
    const tanggal = document.getElementById('inputTanggal').value;
    const waktu = document.getElementById('inputWaktu').value;
    const status = document.getElementById('inputStatus').value;

    if (!nama || !divisi || !tanggal) {
        alert("Mohon lengkapi data nama, divisi, dan tanggal!");
        return;
    }

    const newData = {
        id: Date.now(),
        nama, divisi, ruangan, tanggal, waktu, status
    };

    bookings.push(newData);

    tambahHistory(newData);

    document.getElementById('bookingForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('modalBooking')).hide();

    renderTable();
    updateCards();
    renderHistory();
}


// ===============================================
//  UPDATE STATUS
// ===============================================
function updateStatus(id, newStatus) {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index].status = newStatus;
        renderTable();
        updateCards();
    }
}


// ===============================================
//  HAPUS BOOKING
// ===============================================
function hapusData(id) {
    if (confirm("Yakin ingin menghapus data booking ini?")) {
        bookings = bookings.filter(b => b.id !== id);
        renderTable();
        updateCards();
    }
}


// ===============================================
//  HISTORY
// ===============================================
function tambahHistory(data) {
    const waktuNow = new Date().toLocaleString("id-ID");

    const historyItem = {
        nama: data.nama,
        divisi: data.divisi,
        ruangan: data.ruangan,
        tanggal: data.tanggal,
        waktu: data.waktu,
        status: data.status,
        inputTime: waktuNow
    };

    historyList.push(historyItem);
}

function renderHistory() {
    const tbody = document.getElementById("history-body");
    tbody.innerHTML = "";

    if (historyList.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-3 text-muted">Belum ada data history.</td></tr>`;
        return;
    }

    historyList.forEach(item => {
        const row = `
            <tr>
                <td class="ps-4">
                    <strong>${item.nama}</strong>
                    <br><span class="text-muted small">${item.divisi}</span>
                </td>
                <td>${item.ruangan}</td>
                <td>${item.tanggal} • ${item.waktu}</td>
                <td><span class="badge bg-secondary">${item.status}</span></td>
                <td class="text-muted small">${item.inputTime}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- DATA DUMMY / MOCKUP ---
// Data ini akan muncul otomatis saat website dibuka tanpa backend
let bookings = [
    { id: 1, nama: "Budi Santoso", divisi: "Pemasaran", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-25", waktu: "09:00-11:00", status: "Disetujui" },
    { id: 2, nama: "Siti Aminah", divisi: "SDM & Umum", ruangan: "Ruang Meeting Direksi", tanggal: "2025-11-25", waktu: "13:00-15:00", status: "Menunggu" },
    { id: 3, nama: "Andi Wijaya", divisi: "Teknologi Informasi", ruangan: "Lab Komputer", tanggal: "2025-11-26", waktu: "10:00-12:00", status: "Ditolak - Penuh" },
    { id: 4, nama: "Rina Kartika", divisi: "Keuangan", ruangan: "Aula Serbaguna", tanggal: "2025-11-26", waktu: "15:00-17:00", status: "Disetujui" },
    { id: 5, nama: "Dedi Corbuzier", divisi: "Humas", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-27", waktu: "08:00-10:00", status: "Menunggu" },
    { id: 6, nama: "Joko Anwar", divisi: "Kreatif", ruangan: "Aula Serbaguna", tanggal: "2025-11-28", waktu: "13:00-16:00", status: "Menunggu" }
];

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    updateCards();
});

// --- FUNGSI RENDER TAMPILAN ---

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ""; // Bersihkan tabel sebelum isi ulang

    if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada data booking.</td></tr>`;
        return;
    }

    bookings.forEach(item => {
        // Logika warna status
        let statusClass = "status-menunggu";
        if (item.status === "Disetujui") statusClass = "status-disetujui";
        else if (item.status.includes("Ditolak")) statusClass = "status-ditolak";

        // Ambil huruf pertama nama untuk avatar
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
                        <option value="Ditolak - Penuh" ${item.status === 'Ditolak - Penuh' ? 'selected' : ''}>❌ Ditolak</option>
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

function updateCards() {
    // Hitung jumlah data
    const total = bookings.length;
    const disetujui = bookings.filter(b => b.status === "Disetujui").length;
    const menunggu = bookings.filter(b => b.status === "Menunggu").length;
    const ditolak = bookings.filter(b => b.status.includes("Ditolak")).length;

    // Masukkan angka ke HTML
    document.getElementById('count-total').innerText = total;
    document.getElementById('count-disetujui').innerText = disetujui;
    document.getElementById('count-menunggu').innerText = menunggu;
    document.getElementById('count-ditolak').innerText = ditolak;
}

// --- FUNGSI INTERAKSI (SIMPAN, HAPUS, UPDATE) ---

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
        id: Date.now(), // ID Unik dari waktu sekarang
        nama, divisi, ruangan, tanggal, waktu, status
    };

    bookings.push(newData); // Tambah ke array
    
    // Reset Form & Tutup Modal
    document.getElementById('bookingForm').reset();
    const modalEl = document.getElementById('modalBooking');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    // Render Ulang
    renderTable();
    updateCards();
    
    // Notifikasi kecil (Opsional)
    // alert("Data berhasil disimpan!");
}

function updateStatus(id, newStatus) {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index].status = newStatus;
        renderTable(); // Render ulang agar warna dropdown berubah
        updateCards(); // Update angka di kartu atas
    }
}

function hapusData(id) {
    if (confirm("Yakin ingin menghapus data booking ini?")) {
        bookings = bookings.filter(b => b.id !== id);
        renderTable();
        updateCards();
    }
}
// --- DATA DUMMY ---
let bookings = [
    { id: 1, nama: "Budi Santoso", divisi: "Pemasaran", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-25", waktu: "09:00-11:00", status: "Disetujui" },
    { id: 2, nama: "Siti Aminah", divisi: "SDM & Umum", ruangan: "Ruang Meeting Direksi", tanggal: "2025-11-25", waktu: "13:00-15:00", status: "Menunggu" },
    { id: 3, nama: "Andi Wijaya", divisi: "Teknologi Informasi", ruangan: "Lab Komputer", tanggal: "2025-11-26", waktu: "10:00-12:00", status: "Ditolak - Penuh" },
    { id: 4, nama: "Rina Kartika", divisi: "Keuangan", ruangan: "Aula Serbaguna", tanggal: "2025-11-26", waktu: "15:00-17:00", status: "Disetujui" },
    { id: 5, nama: "Dedi Corbuzier", divisi: "Humas", ruangan: "Ruang Rapat Utama Lt.1", tanggal: "2025-11-27", waktu: "08:00-10:00", status: "Menunggu" },
    { id: 6, nama: "Joko Anwar", divisi: "Kreatif", ruangan: "Aula Serbaguna", tanggal: "2025-11-28", waktu: "13:00-16:00", status: "Menunggu" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    updateCards();
});

// --- RENDER TABLE ---
function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ""; 

    if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Belum ada data booking.</td></tr>`;
        return;
    }

    bookings.forEach(item => {
        // Tentukan style untuk SELECT option
        let statusClass = "status-menunggu";
        // Tentukan style untuk BARIS tabel (background)
        let rowClass = "";

        if (item.status === "Disetujui") {
            statusClass = "status-disetujui";
            rowClass = "row-disetujui";
        } 
        else if (item.status.includes("Ditolak")) {
            statusClass = "status-ditolak";
            rowClass = "row-ditolak";
        }

        const initial = item.nama.charAt(0).toUpperCase();

        const row = `
            <tr class="${rowClass}">
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

// --- UPDATE KARTU STATISTIK ---
function updateCards() {
    const total = bookings.length;
    const disetujui = bookings.filter(b => b.status === "Disetujui").length;
    const menunggu = bookings.filter(b => b.status === "Menunggu").length;
    const ditolak = bookings.filter(b => b.status.includes("Ditolak")).length;

    animateValue("count-total", parseInt(document.getElementById('count-total').innerText), total, 500);
    animateValue("count-disetujui", parseInt(document.getElementById('count-disetujui').innerText), disetujui, 500);
    animateValue("count-menunggu", parseInt(document.getElementById('count-menunggu').innerText), menunggu, 500);
    animateValue("count-ditolak", parseInt(document.getElementById('count-ditolak').innerText), ditolak, 500);
}

// Efek animasi angka naik
function animateValue(id, start, end, duration) {
    if (start === end) return;
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

// --- LOGIKA UTAMA (CRUD) ---

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
    
    // Reset & Tutup Modal
    document.getElementById('bookingForm').reset();
    const modalEl = document.getElementById('modalBooking');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    renderTable();
    updateCards();
    showToast("Data booking baru berhasil ditambahkan!");
}

function updateStatus(id, newStatus) {
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        const oldStatus = bookings[index].status;
        bookings[index].status = newStatus;
        
        renderTable();
        updateCards();
        
        // Pesan berbeda tergantung status
        if(newStatus.includes("Ditolak")) {
             showToast(`Booking milik <b>${bookings[index].nama}</b> telah <span class="text-danger fw-bold">DITOLAK</span>.`);
        } else if (newStatus === "Disetujui") {
             showToast(`Booking milik <b>${bookings[index].nama}</b> telah <span class="text-success fw-bold">DISETUJUI</span>.`);
        } else {
             showToast(`Status booking diubah menjadi: ${newStatus}`);
        }
    }
}

function hapusData(id) {
    if (confirm("Yakin ingin menghapus data booking ini?")) {
        bookings = bookings.filter(b => b.id !== id);
        renderTable();
        updateCards();
        showToast("Data booking berhasil dihapus.");
    }
}

// --- NOTIFIKASI TOAST ---
function showToast(message) {
    // Buat element toast
    const toast = document.createElement("div");
    toast.className = "alert alert-light border shadow-sm d-flex align-items-center position-fixed top-0 end-0 m-3";
    toast.style.zIndex = "9999";
    toast.style.maxWidth = "400px";
    toast.style.borderLeft = "5px solid #007CA8"; // Aksen biru PLN
    
    toast.innerHTML = `
        <i class="fas fa-info-circle text-primary me-2"></i>
        <div>${message}</div>
    `;

    document.body.appendChild(toast);

    // Animasi masuk
    toast.animate([
        { transform: 'translateX(100%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 300, fill: 'forwards' });

    // Hapus otomatis setelah 3 detik
    setTimeout(() => {
        toast.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: 'translateX(100%)', opacity: 0 }
        ], { duration: 300, fill: 'forwards' }).onfinish = () => toast.remove();
    }, 3000);
}
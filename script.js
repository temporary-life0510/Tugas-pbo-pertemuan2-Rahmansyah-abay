/**
 * LAB SHEET PRAKTIKUM OOP
 * Standar Penulisan: Clean Code & PSR-12 Principles
 */

// ===================================================
// 1. CLASS MAHASISWA & METHOD (Poin 1 & 2)
// ===================================================
class Mahasiswa {
    /**
     * Constructor Mahasiswa
     * @param {string} nim 
     * @param {string} nama 
     * @param {string} prodi 
     * @param {number} ipk 
     */
    constructor(nim, nama, prodi, ipk) {
        this.nim = nim;
        this.nama = nama;
        this.prodi = prodi;
        this.ipk = parseFloat(ipk);
    }

    /**
     * Method info() - Mengembalikan teks deskripsi mahasiswa
     */
    info() {
        return `Mahasiswa a.n. ${this.nama} (${this.nim}) dari Prodi ${this.prodi} memperoleh IPK ${this.ipk.toFixed(2)}.`;
    }

    /**
     * Method predikat() - Mengembalikan kategori kelulusan
     */
    predikat() {
        if (this.ipk >= 3.51) {
            return "Cumlaude";
        } else if (this.ipk >= 3.00) {
            return "Sangat Memuaskan";
        } else {
            return "Memuaskan";
        }
    }
}

// ===================================================
// 2. CLASS PRODUK & METHOD (Poin 4)
// ===================================================
class Produk {
    /**
     * Constructor Produk
     * @param {string} nama 
     * @param {number} harga 
     * @param {number} stok 
     */
    constructor(nama, harga, stok) {
        this.nama = nama;
        this.harga = Number(harga);
        this.stok = Number(stok);
    }

    /**
     * Method totalNilai() - Mengkalkulasi (Harga * Stok)
     */
    totalNilai() {
        return this.harga * this.stok;
    }
}

// ===================================================
// 3. INSTANSIASI OBJEK MAHASISWA (Task 1-2)
// ===================================================
const daftarMahasiswa = [
    new Mahasiswa("24.24.032255", "Rahmansyah", "Pendidikan Teknologi Informasi", 3.85),
    new Mahasiswa("24.24.031635", "Muhammad Fitriannur Akbar", "Pendidikan Teknologi Informasi", 3.75)
];

// ===================================================
// 4. DATA SPREADSHEET PRODUK (Minimal 20 Data)
// ===================================================
const daftarProduk = [
    new Produk("Laptop ASUS ROG Strix", 18500000, 12),
    new Produk("Mouse Wireless Logitech MX Master", 1250000, 45),
    new Produk("Keyboard Mechanical Keychron K2", 1350000, 28),
    new Produk("Monitor LG UltraGear 24 Inch", 2300000, 15),
    new Produk("Flashdisk SanDisk Ultra 64GB", 95000, 120),
    new Produk("Harddisk External WD Elements 1TB", 780000, 35),
    new Produk("Headset Gaming SteelSeries Arctis", 1450000, 20),
    new Produk("Webcam Logitech C920 HD", 980000, 18),
    new Produk("Router Wi-Fi TP-Link Archer C6", 450000, 50),
    new Produk("RAM DDR4 Corsair Vengeance 16GB", 890000, 40),
    new Produk("SSD NVMe Samsung 970 EVO 1TB", 1650000, 25),
    new Produk("Graphic Card RTX 3060 12GB", 4850000, 8),
    new Produk("Power Supply Corsair 650W Gold", 1100000, 14),
    new Produk("Motherboard ASUS TUF B550M", 2150000, 10),
    new Produk("Processor AMD Ryzen 5 5600X", 2400000, 16),
    new Produk("Cooler Master Hyper 212 RGB", 480000, 30),
    new Produk("Casing PC NZXT H510 Flow", 1250000, 11),
    new Produk("Kabel LAN Cat6 UTP 10m", 55000, 85),
    new Produk("Speaker Bluetooth JBL Go 3", 550000, 22),
    new Produk("Printer Canon Pixma TS307", 850000, 14),
    new Produk("Proyektor Epson EB-X500", 5600000, 6),
    new Produk("Drawing Tablet Huion Kamvas 13", 3400000, 9)
];

// Helper Format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
}

// ===================================================
// 5. RENDER FUNCTIONS KE DASHBOARD UI
// ===================================================

// Render Kartu Mahasiswa
function renderMahasiswa() {
    const container = document.getElementById('mahasiswa-container');
    container.innerHTML = '';

    daftarMahasiswa.forEach(mhs => {
        const predikat = mhs.predikat();
        let badgeClass = 'badge-cumlaude';
        
        if (predikat === 'Sangat Memuaskan') badgeClass = 'badge-sangat';
        if (predikat === 'Memuaskan') badgeClass = 'badge-memuaskan';

        const cardHTML = `
            <div class="mhs-card">
                <div class="mhs-name">${mhs.nama}</div>
                <div class="mhs-nim">NIM: ${mhs.nim}</div>
                <div class="mhs-info">
                    <i class="fa-solid fa-circle-info"></i> ${mhs.info()}
                </div>
                <div>
                    Predikat: <span class="badge ${badgeClass}">${predikat}</span>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// Render Tabel Spreadsheet Produk & Statistiknya
function renderProduk(data = daftarProduk) {
    const tbody = document.getElementById('produk-table-body');
    tbody.innerHTML = '';

    let totalStokAll = 0;
    let totalNilaiAll = 0;

    data.forEach((prod, index) => {
        const totalNilaiBarang = prod.totalNilai(); // Menggunakan Method totalNilai()
        totalStokAll += prod.stok;
        totalNilaiAll += totalNilaiBarang;

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${prod.nama}</strong></td>
                <td>${formatRupiah(prod.harga)}</td>
                <td>${prod.stok} unit</td>
                <td><strong>${formatRupiah(totalNilaiBarang)}</strong></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Update Footers & KPI Stats Cards
    document.getElementById('foot-total-stok').innerText = totalStokAll.toLocaleString('id-ID') + ' unit';
    document.getElementById('foot-total-nilai').innerText = formatRupiah(totalNilaiAll);
    
    document.getElementById('stat-total-items').innerText = data.length;
    document.getElementById('stat-total-stok').innerText = totalStokAll.toLocaleString('id-ID');
    document.getElementById('stat-total-nilai').innerText = formatRupiah(totalNilaiAll);
}

// Fitur Filter / Pencarian Live Spreadsheet
function filterProduk() {
    const keyword = document.getElementById('search-input').value.toLowerCase();
    const filtered = daftarProduk.filter(p => p.nama.toLowerCase().includes(keyword));
    renderProduk(filtered);
}

// Menjalankan Rendering saat Halaman Siap Loaded
document.addEventListener('DOMContentLoaded', () => {
    renderMahasiswa();
    renderProduk();
});

Aku udah buat 3 website blogging buat personal. Semuanya dipake aja sulit, apa lagi di maintain. Semoga website ini jadi website blogging terakhir yang akan-ku buat.

# Apa yang salah sebelumnya
Pertama-tama, infrastrukturnya terlalu kompleks, ada database, WYSWYG editor buat markdownnya, bahkan ada authentikasi juga (padahal yang make buat sendiri). Kebanyakan "fitur" juga gak dibuat secara benar dan gak nambah "value" buat website blogging sendiri. 

Lalu, teknologi yang digunakan itu baru ku pake dan juga kurang populer, yang berarti kurang juga support komunitasnya, dan biasanya berakhir dengan ngebuat fitur sendiri dari awal. Teknologi-teknologi ini bukannya jelek, tapi emang yang pakenya aja skill issue. Seharusnya fitur-fitur yang diinginkan bisa dibuat dengan benar bahkan dengan keterbatasan diatas.

Semoga dengan pengalaman diatas, Projek ini tidak jatuh ke lubang kesalahan yang sama.

# Tujuan, teknologi, dan limitasi

Fitur yang didesain harus se-simple mungkin. Tujuan utama dari blog ini adalah

- Memperlihatkan blog yang ditulis dalam bentuk markdown.
- Memperlihatkan list blog yang sudah ditulis dalam bentuk grid.
- Mendukung 2 bahasa, yaitu indonesia dan inggris.

Untuk teknologi, deployment akan dilakukan di [Deno Deploy](https://deno.com/deploy) sebagai cara utama untuk hosting projek ini. Yang berarti, projek ini harus menggunakan ekosistemnya deno sendiri. Terutama javascript runtime bernama [Deno](https://deno.com/). Ya walaupun katanya Deno Deploy sudah support menggunakan ekosistem nodejs, tapi akan lebih baik main aman saja. 

Untuk webserver, selain menggunakan standard library dari Deno sendiri, [Hono](https://hono.dev/) adalah framework yang dapat diandalkan. Dia juga bisa jalan atas runtime lain - bahkan di [cloudflare workers](https://workers.cloudflare.com/). Tidak seperti web server lain, Hono bisa support render JSX dan bahkan support *client side rendering* (Walaupun sebenernya aku sendiri gak pernah berhasil buat makenya). Ini membuat hono salah satu frameowrk terbaik untuk digunakan.

Dulu, Deno punya cara me-manage package nya sendiri, yang bisa dibilang agak sulit dipakai. Support untuk NPM juga kurang bisa diandalkan. Tapi seakrang, tim nya Deno membuat [JSR](http://jsr.io/) yang merupakan registry seperti NPM dengan tujuan utama menghosting package yang bisa berjalan di runtime apapun. Dia juga support NPM package, yang mendorong Deno sendiri agar support NPM nya lebih baik. Aku sendiri mendukung gerakan ini karena sekarang, runtime javascript udah gak bisa hitung dengan jari lagi (NodeJS, Deno, Bun, Serverless dan Edge runtime dan masi banyak lagi)

Dengan teknologi-teknologi ini, Arah dari projek ini menjadi jelas: agar **portable yang dapat dijalankan di berbagai runtime**. Tentu saja hal ini ada kelebihan dak kekurangan - Tapi paling tidak, arah ini memudahkan untuk memilih librarie atau pratices yang akan di gunakan (atau dihindari).
Untuk mendukung tujuan ini, ada beberapa peraturan yang harus ikuti: 

1. Hindari menggunakan native api dari node.js.
2. Jangan menggunakan filesystem.
3. Hanya menggunakan package dari JSR (jika bisa).

Artinya, akan ada *build step* dan *preprocessing*. Yang termasuk [tailwind](https://tailwindcss.com/) untuk melakukan styling.

# Hasilnya

Website ini adalah hasil dari pendekatan diatas. Mungkin agak berbeda dari website blogging pada umumnnya, tapi sudah cukup oke menurutku. Terutama karena aku tau cara kerja website ini, memungkinkan untuk menambahkan fitur keren lainnya.
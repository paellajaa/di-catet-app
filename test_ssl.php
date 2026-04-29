<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $response = Illuminate\Support\Facades\Http::get('https://www.google.com');
    echo "SSL OK\n";
} catch (\Exception $e) {
    echo "SSL ERROR: " . $e->getMessage() . "\n";
}

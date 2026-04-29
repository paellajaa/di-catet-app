<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    /**
     * Display a listing of transactions with summary.
     */
    public function index(): JsonResponse
    {
        $transactions = Transaction::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        $totalIncome = Transaction::where('user_id', auth()->id())->income()->sum('amount');
        $totalExpense = Transaction::where('user_id', auth()->id())->expense()->sum('amount');

        return response()->json([
            'data' => $transactions,
            'summary' => [
                'balance' => $totalIncome - $totalExpense,
                'income' => $totalIncome,
                'expense' => $totalExpense,
            ],
        ]);
    }

    /**
     * Store a newly created transaction.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01|max:9999999999999.99',
            'type' => ['required', Rule::in(['income', 'expense'])],
            'category' => ['required', Rule::in([
                'Makanan', 'Transportasi', 'Hiburan', 'Belanja', 'Kesehatan', 'Pendidikan', 'Tagihan',
                'Gaji', 'Bonus/THR', 'Penjualan', 'Transfer',
                'Sosial', 'Investasi', 'Lainnya'
            ])],
        ]);

        $validated['user_id'] = auth()->id();

        $transaction = Transaction::create($validated);

        return response()->json([
            'message' => 'Transaksi berhasil ditambahkan.',
            'data' => $transaction,
        ], 201);
    }

    /**
     * Remove the specified transaction.
     */
    public function destroy(Transaction $transaction): JsonResponse
    {
        if ($transaction->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $transaction->delete();

        return response()->json([
            'message' => 'Transaksi berhasil dihapus.',
        ]);
    }
}

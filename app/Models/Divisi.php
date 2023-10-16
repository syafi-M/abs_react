<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Divisi extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'jabatan_id',
    ];

    public function Perlengkapan()
    {
        return $this->belongsToMany(Perlengkapan::class, 'divisi_perlengkapan');
    }
    public function Jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id', 'id');
    }
    
    public function User()
    {
        return $this->hasMany(User::class);
    }
}

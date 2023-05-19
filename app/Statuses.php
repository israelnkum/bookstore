<?php

namespace App;

enum Statuses: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case CANCELED = 'canceled';
    case REJECTED = 'rejected';
    case VIEWED = 'VIEWED';
}
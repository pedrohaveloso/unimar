<?php

namespace POO;

interface Registrable
{
    public function register(Professional ...$professional): void;
}

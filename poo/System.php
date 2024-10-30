<?php

use POO\{Job, Person, Professional, Registrable};

spl_autoload_register(function (string $namespace): void {
    $namespace = str_replace('POO\\', 'src/', $namespace);
    $namespace = str_replace('\\', '/', $namespace);
    include_once __DIR__ . "/$namespace.php";
});

$professionals = file_get_contents(__DIR__ . '/professionals.json');
$professionals = json_decode($professionals, true);
$professionals = array_map(
    fn(array $professional): Professional => Professional::fromArray($professional),
    $professionals
);

$job = new Job('Desenvolvedor FullStack Java (Spring) + Angular 2');

function register(Registrable &$registrable): callable
{
    return fn(Person $person) => $registrable->register($person);
}

function registerMultiple(Registrable &$registrable): callable
{
    /** @param Person[] $persons */
    return fn(array $persons) => $registrable->register(...$persons);
}

register($job)(array_pop($professionals));
registerMultiple($job)($professionals);

echo PHP_EOL . $job->getAllProfessionalsToShow() . PHP_EOL;
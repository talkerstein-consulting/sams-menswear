#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket::INET;
use File::Spec;

$| = 1;
my $port = $ARGV[0] || 5173;
my $root = File::Spec->rel2abs('.');

my %mime = (
    html => 'text/html; charset=utf-8',
    htm  => 'text/html; charset=utf-8',
    css  => 'text/css; charset=utf-8',
    js   => 'application/javascript; charset=utf-8',
    mjs  => 'application/javascript; charset=utf-8',
    json => 'application/json; charset=utf-8',
    svg  => 'image/svg+xml',
    png  => 'image/png',
    jpg  => 'image/jpeg',
    jpeg => 'image/jpeg',
    gif  => 'image/gif',
    webp => 'image/webp',
    ico  => 'image/x-icon',
    woff => 'font/woff',
    woff2=> 'font/woff2',
    ttf  => 'font/ttf',
    txt  => 'text/plain; charset=utf-8',
);

my $sock = IO::Socket::INET->new(
    LocalAddr => '127.0.0.1',
    LocalPort => $port,
    Proto     => 'tcp',
    Listen    => 16,
    ReuseAddr => 1,
) or die "bind $port: $!";

print "vite-dev (perl static) serving $root on http://127.0.0.1:$port\n";

while (my $client = $sock->accept) {
    my $req = '';
    while (my $line = <$client>) {
        $req .= $line;
        last if $line =~ /^\r?\n$/;
    }
    my ($method, $path) = $req =~ /^(\S+)\s+(\S+)/;
    $path ||= '/';
    $path =~ s/\?.*//;
    $path =~ s/#.*//;
    $path = '/index.html' if $path eq '/';
    $path =~ s{^/+}{};
    $path =~ s{\.\.}{}g;

    my $file = File::Spec->catfile($root, $path);
    if (!-f $file) {
        # SPA fallback
        $file = File::Spec->catfile($root, 'index.html');
    }

    if (open(my $fh, '<:raw', $file)) {
        local $/;
        my $body = <$fh>;
        close $fh;
        my ($ext) = $file =~ /\.([^.]+)$/;
        my $ct = $mime{lc($ext || '')} || 'application/octet-stream';
        my $len = length $body;
        print $client "HTTP/1.1 200 OK\r\nContent-Type: $ct\r\nContent-Length: $len\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n";
        print $client $body;
    } else {
        my $body = "404 Not Found";
        print $client "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: ".length($body)."\r\nConnection: close\r\n\r\n$body";
    }
    close $client;
}

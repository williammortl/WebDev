// emscripten-only includes
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

// includes
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// definitions

// global variables
int _nWidth = 0;
int _nHeight = 0;
char * _pcCurrent;
char *_pcNext;

/*
 *
 * Dual-Purpose Functions 
 *
 */
// creates the universe for the game of life
#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
#endif
char* CreateUniverse(int nWidth, int nHeight) 
{
    printf("hi");
    _nWidth = nWidth;
    _nHeight = nHeight;
    _pcCurrent = malloc(_nWidth * _nHeight * sizeof(char));
    _pcNext = malloc(_nWidth * _nHeight * sizeof(char));
    return _pcCurrent;
}

#ifdef __EMSCRIPTEN__
/*
 *
 * Web Assembly Functions 
 *
 */
// main entry point for the web assembly
int main()
{
    printf("hi from main");
    CreateUniverse(7, 7);
}

#else
/*
 *
 * Console Application Functions 
 *
 */
// main entry point for console application
int main(int argc, char *argv[])
{
    printf("hi from the console");
}

#endif
/** @noSelfInFile */

declare namespace table {
    /**
     * Creates a new empty table, preallocating memory. This preallocation may help
     *  performance and save memory when you know in advance how many elements the 
     * table will have.
     *
     * @param nseq hint for how many elements the table will have as a sequence
     * @param nrec (optional) hint for how many other elements the table will have; its default is zero.
     */
    function create<T>(nseq: number, nrec?: number): T[];
}
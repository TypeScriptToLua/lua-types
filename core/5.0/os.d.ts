// Based on https://www.lua.org/manual/5.0/manual.html#5.7

/** @noSelfInFile */

interface LuaDateInfo {
    year: number;
    month: number;
    day: number;
    hour?: number;
    min?: number;
    sec?: number;
    isdst?: boolean;
}

interface LuaDateInfoResult {
    year: number;
    month: number;
    day: number;
    hour: number;
    min: number;
    sec: number;
    isdst: boolean;
    yday: number;
    wday: number;
}

/**
 * Operating System Facilities
 */
declare namespace os {
    /**
     * Returns an approximation of the amount in seconds of CPU time used by the
     * program.
     */
    function clock(): number;

    /**
     * Returns a string or a table containing date and time, formatted according
     * to the given string format.
     *
     * If the time argument is present, this is the time to be formatted (see the
     * os.time function for a description of this value). Otherwise, date formats
     * the current time.
     *
     * If format starts with '!', then the date is formatted in Coordinated
     * Universal Time. After this optional character, if format is the string
     * "*t", then date returns a table with the following fields: year, month
     * (1–12), day (1–31), hour (0–23), min (0–59), sec (0–61), wday (weekday,
     * 1–7, Sunday is 1), yday (day of the year, 1–366), and isdst (daylight
     * saving flag, a boolean). This last field may be absent if the information
     * is not available.
     *
     * If format is not "*t", then date returns the date as a string, formatted
     * according to the same rules as the ISO C function strftime.
     *
     * When called without arguments, date returns a reasonable date and time
     * representation that depends on the host system and on the current locale.
     * (More specifically, os.date() is equivalent to os.date("%c").)
     *
     * On non-POSIX systems, this function may be not thread safe because of its
     * reliance on C function gmtime and C function localtime.
     */
    function date(format?: string, time?: number): string;

    /**
     * Returns a string or a table containing date and time, formatted according
     * to the given string format.
     *
     * If the time argument is present, this is the time to be formatted (see the
     * os.time function for a description of this value). Otherwise, date formats
     * the current time.
     *
     * If format starts with '!', then the date is formatted in Coordinated
     * Universal Time. After this optional character, if format is the string
     * "*t", then date returns a table with the following fields: year, month
     * (1–12), day (1–31), hour (0–23), min (0–59), sec (0–61), wday (weekday,
     * 1–7, Sunday is 1), yday (day of the year, 1–366), and isdst (daylight
     * saving flag, a boolean). This last field may be absent if the information
     * is not available.
     *
     * If format is not "*t", then date returns the date as a string, formatted
     * according to the same rules as the ISO C function strftime.
     *
     * When called without arguments, date returns a reasonable date and time
     * representation that depends on the host system and on the current locale.
     * (More specifically, os.date() is equivalent to os.date("%c").)
     *
     * On non-POSIX systems, this function may be not thread safe because of its
     * reliance on C function gmtime and C function localtime.
     */
    function date(format: '*t', time?: number): LuaDateInfoResult;

    /**
     * Returns the difference, in seconds, from time t1 to time t2 (where the
     * times are values returned by os.time). In POSIX, Windows, and some other
     * systems, this value is exactly t2-t1.
     */
    function difftime(t1: number, t2: number): number;

    /**
     * This function is equivalent to the C function system. It passes command to
     * be executed by an operating system shell. It returns a status code, which
     * is system-dependent. If command is absent, then it returns nonzero if a
     * shell is available and zero otherwise.
     */
    function execute(command?: string): number;

    /**
     * Calls the C function exit, with an optional code, to terminate the host
     * program. The default value for code is the success code.
     */
    function exit(code?: number): never;

    /**
     * Returns the value of the process environment variable varname, or nil if
     * the variable is not defined.
     */
    function getenv(varname: string): string | undefined;

    /**
     * Deletes the file (or empty directory, on POSIX systems) with the given
     * name. If this function fails, it returns nil, plus a string describing the
     * error and the error code. Otherwise, it returns true.
     */
    function remove(filename: string): LuaMultiReturn<[true] | [undefined, string]>;

    /**
     * Renames the file or directory named oldname to newname. If this function
     * fails, it returns nil, plus a string describing the error and the error
     * code. Otherwise, it returns true.
     */
    function rename(oldname: string, newname: string): LuaMultiReturn<[true] | [undefined, string]>;

    /**
     * Sets the current locale of the program. locale is a system-dependent string
     * specifying a locale; category is an optional string describing which
     * category to change: "all", "collate", "ctype", "monetary", "numeric", or
     * "time"; the default category is "all". The function returns the name of the
     * new locale, or nil if the request cannot be honored.
     *
     * If locale is the empty string, the current locale is set to an
     * implementation-defined native locale. If locale is the string "C", the
     * current locale is set to the standard C locale.
     *
     * When called with nil as the first argument, this function only returns the
     * name of the current locale for the given category.
     *
     * This function may be not thread safe because of its reliance on C function
     * setlocale.
     */
    function setlocale(
        locale?: string,
        category?: 'all' | 'collate' | 'ctype' | 'monetary' | 'numeric' | 'time'
    ): string | undefined;

    /**
     * Returns the current time when called without arguments, or a time
     * representing the local date and time specified by the given table. This
     * table must have fields year, month, and day, and may have fields hour
     * (default is 12), min (default is 0), sec (default is 0), and isdst (default
     * is nil). Other fields are ignored. For a description of these fields, see
     * the os.date function.
     *
     * The values in these fields do not need to be inside their valid ranges. For
     * instance, if sec is -10, it means -10 seconds from the time specified by
     * the other fields; if hour is 1000, it means +1000 hours from the time
     * specified by the other fields.
     *
     * The returned value is a number, whose meaning depends on your system. In
     * POSIX, Windows, and some other systems, this number counts the number of
     * seconds since some given start time (the "epoch"). In other systems, the
     * meaning is not specified, and the number returned by time can be used only
     * as an argument to os.date and os.difftime.
     */
    function time(): number;

    /**
     * Returns the current time when called without arguments, or a time
     * representing the local date and time specified by the given table. This
     * table must have fields year, month, and day, and may have fields hour
     * (default is 12), min (default is 0), sec (default is 0), and isdst (default
     * is nil). Other fields are ignored. For a description of these fields, see
     * the os.date function.
     *
     * The values in these fields do not need to be inside their valid ranges. For
     * instance, if sec is -10, it means -10 seconds from the time specified by
     * the other fields; if hour is 1000, it means +1000 hours from the time
     * specified by the other fields.
     *
     * The returned value is a number, whose meaning depends on your system. In
     * POSIX, Windows, and some other systems, this number counts the number of
     * seconds since some given start time (the "epoch"). In other systems, the
     * meaning is not specified, and the number returned by time can be used only
     * as an argument to os.date and os.difftime.
     */
    function time(table: LuaDateInfo): number;

    /**
     * Returns a string with a file name that can be used for a temporary file.
     * The file must be explicitly opened before its use and explicitly removed
     * when no longer needed.
     *
     * On POSIX systems, this function also creates a file with that name, to
     * avoid security risks. (Someone else might create the file with wrong
     * permissions in the time between getting the name and creating the file.)
     * You still have to open the file to use it and to remove it (even if you do
     * not use it).
     *
     * When possible, you may prefer to use io.tmpfile, which automatically
     * removes the file when the program ends.
     */
    function tmpname(): string;
}

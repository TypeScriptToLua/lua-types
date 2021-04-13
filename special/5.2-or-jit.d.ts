declare namespace io {
    type FileReadNumberFormat = '*n';
    type FileReadLineFormat = '*l';
    type FileReadFormat = FileReadNumberFormat | FileReadLineFormat | '*a' | '*L' | number;
}

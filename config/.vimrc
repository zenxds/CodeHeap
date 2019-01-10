"""""""""""""""""""""""""""""""""""""""
" Basic
"""""""""""""""""""""""""""""""""""""""

" close vi compatible
set nocompatible

" can use backspace and delete in insert mod
set backspace=indent,eol,start 

" Set utf8 as standard encoding and en_US as the standard language
set encoding=utf8

set smartindent   " Smart indent
set autoindent    " auto indent
set smarttab

" tab size 
set tabstop=4

" default indent size
set shiftwidth=4

" how many lines of history VIM has to remember
set history=500

" Enable filetype plugins
filetype plugin on
filetype indent on

" auto read when a file is changed from the outside
set autoread

" Ignore case when searching
set ignorecase

" When searching try to be smart about cases 
set smartcase

" intime search
set incsearch

" highlight search
set hlsearch


"""""""""""""""""""""""""""""""""""""""
" Appearance
"""""""""""""""""""""""""""""""""""""""

" highlight syntax
syntax on

" color theme
" colorscheme desert
" set background=dark
colorscheme molokai

" set guifont=Monaco:h20

" show line number
set number

" show current position on the right corner
set ruler

" show mod and current cmd on the left corner
set showmode
set showcmd

" highlight current line
set cursorline

" Show matching brackets when text indicator is over them
set showmatch


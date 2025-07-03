//{
/* <div className='row mx-4 p-0 d-md-flex my-0  justify-content-between form-container'>
          <form className='col-12 col-md-6 d-md-flex align-items-center'>
            <span className='d-flex date-tag'>Select Date :</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker', 'DatePicker']}
                sx={{ m: 3 }}>
                <DatePicker
                  label='From'
                  value={fromDate}
                  required={true}
                  format='DD-MM-YYYY'
                  minDate={dayjs('2024-04-01')}
                  maxDate={toDate}
                  onChange={(newValue) => setfrom(newValue)}
                  error={showResult && fromDate === null}
                  sx={{ width: '70px' }}
                />
                <DatePicker
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      marginLeft: -2,
                    },
                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root': {
                      left: '-15px',
                    },
                    width: '70px',
                  }}
                  className='datepick'
                  label='To'
                  required={true}
                  value={toDate}
                  format='DD-MM-YYYY'
                  minDate={fromDate}
                  maxDate={dayjs(maxDate)}
                  onChange={(newValue) => setto(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </form>
          <div className='col-12 col-md-6 d-flex justify-content-between   align-items-center'>
            <button className='search-btn col-6 mt-2' onClick={handleSubmit}>
              Search
            </button>
            <button
              disabled={salesData.length <= 0}
              onClick={handleDownloadExcel}
              className='col-6 btn bnt-lg download_btn mt-2 ms-2 m-md-0 '>
              Download Sheet
              <img src='../../download.svg' alt='hetero' className='m-1' />
            </button>
          </div>
        </div> */
//}
//{
/* <div>
          {showResult ? (
            <div className='row d-flex mt-1 mt-md-0  mx-4'>
              <span className='results-text col-12 col-md-6 align-self-center'>
                Total Records - {records}
              </span>
              <TablePagination
                className=' col-12  col-md-6 pagination-container'
                rowsPerPageOptions={[50, 100, 500]}
                component='div'
                count={records}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : null}
        </div> */
//}

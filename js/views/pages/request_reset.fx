$render('layout')

$replace('body')
<section class="bg-gray-50">
  <div
    class="flex flex-col items-center justify-center min-h-screen p-0 sm:p-6 ">
    <div class='w-full sm:max-w-md'>
      $if(error)
      $render('components.alerts.error', message=error)$endrender
      $endif

      $if(success)
      $render('components.alerts.success', message=success)$endrender
      $endif
    </div>
    <div class="w-full bg-white md:mt-0 sm:max-w-md p-4">
      $render('components.headers.h2', title='Forgot your password?')$endrender

      $render('components.paras.p2', title='Just type in your email and we will
      send you a link to reset your password!')

      $endrender
      <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="POST"
        action="/request-reset">
        <div>
          $render('components.label', for='email', title='Your email')
          $endrender
          $render('components.inputs.email', value=body.email)
          $endrender
        </div>
        $render('components.buttons.primary', title='Send Reset Link',
        style='w-full',
        type='submit')$endrender
      </form>
    </div>
  </div>
</section>
$endreplace

$endrender
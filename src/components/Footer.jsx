export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      &copy; {year} Ishak Saim. All rights reserved.
    </footer>
  )
}
